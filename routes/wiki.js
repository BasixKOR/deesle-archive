'use strict'
const _ = require('lodash')

const namumark = require(`${__dirname}/../utils/namumark`)
const Doc = require(`${__dirname}/../utils/schema/Doc`)
const setting = require(`${__dirname}/../setting`)
module.exports = {
  // GET / == 대문으로 연결시킨다.
  'root': function (req, reply) {
    if (setting.needSetup) { // 설치가 되지 않았거나 안 된 경우
      return reply('설치를 시작합니다.').redirect().location(`/setup`) // 설치로 이동합니다.
    }
    reply('대문으로 가세요.').redirect().location(`w/${setting.frontPage}`) // 설치되었을시 대문으로 보냅니다.
  },
  // GET /w/{name} == 위키 페이지로 연결시킨다.
  // request.params.name == 문서명
  'view': function (request, reply) {
    Doc.findOne({name: request.params.name}, function (err, docs) {
      if (err) console.error(err)
      if (_.isNull(docs)) {
        return reply.view('view', {
          name: request.params.name,
          content: '404 Document Not Found',
          settings: setting
        }).code(404)
      }
      namumark(_.last(docs.reversion).content).then(parsed => {
        reply.view('view', {
          name: request.params.name,
          content: parsed,
          settings: setting
        })
      }).catch(err => { throw err })
    })
  },
  // GET /edit/{name} == 위키 페이지를 편집합니다.
  'edit': function (request, reply) {
    Doc.findOne({name: request.params.name}).exec()
      .then((doc) => {
        if (_.isNull(doc)) {
          reply.view('edit', {
            name: request.params.name,
            content: '없는 문서입니다. 편집시 새로 생성됩니다.',
            settings: setting
          })
        } else {
          reply.view('edit', {
            name: request.params.name,
            content: _.last(doc.reversion).content,
            settings: setting
          })
        }
      })
      .catch((err) => {
        console.error(err)
        reply.view('edit', {
          name: request.params.name,
          content: '오류가 발생했어요! 혹시 빈 문서가 아니라면, 다시 편집버튼을 눌러주세요!',
          settings: setting
        })
      })
  },
  // POST /edit/{name} == 편집이 끝나고 데이터를 받아옵니다.
  'edited': function (request, reply) {
    console.log(request.auth.credentials)
    Doc.findOne({name: request.params.name}).exec()
      .then((doc) => {
        doc.reversion.push({
          content: request.payload.content,
          editor: request.info.address
        })
        return doc.save()
      })
      .then(() => reply('다시 문서로!').redirect().location(`/w/${request.params.name}`))
  },
  'history': function (request, reply) {
    return reply('미구현').code(501)

    /* eslint-disable */
    Doc.findOne({name: request.params.name}).exec()
      .then(doc => {

      })
    /* eslint-enable */
  },
  'search': function (request, reply) {
    return reply('미구현').code(501)
  }
}
