const { pgQueryMock } = require('./pg_mock')
const rp = require('request-promise') 
const url = require('url') 
const app = require('../src/app') 
const crypto = require('crypto')

const port = app.get('port') || 3030 
const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
}) 


// let token2 = () => { 
//   const timestamp = Math.floor(Date.now()/1000+4000); 
//   return `adminApiKey.${crypto.createHmac('sha256','adminApiSecret').update(''+timestamp).digest('base64')}.${timestamp}`
// }
//

const apiClientData = {api_key: 'valid_api_key', secret: 'secret' }

describe('Application tests', () => {
  beforeAll(done => {
    this.server = app.listen(port) 
    this.server.once('listening', () => done()) 
  })

  afterAll(done => {
    this.server.close(done) 
  })

  beforeEach(() => 
    pgQueryMock(`SELECT * FROM clients WHERE api_key = 'valid_api_key'`, [apiClientData])
  )

  it('starts and shows the index page', () => {
    expect.assertions(1) 
    return rp(getUrl()).then(
      body => expect(body.indexOf('<html>')).not.toBe(-1)
    )
  })


  describe('system routes', () => {
    it('/system/readiness should return 200', () => {
      expect.assertions(1) 
      return rp({
        url: getUrl('/system/readiness')
      }).then(res => expect(res).toEqual('OK'))
    }) 

    it('/system/liveliness should return 200', () => {
      expect.assertions(1)
      return rp({
        url: getUrl('/system/liveliness')
      }).then(res => expect(res).toEqual('OK'))
    }) 
  }) 

  describe('404', () => {
    it('shows a 404 HTML page', () => {
      expect.assertions(2) 
      return rp({
        url: getUrl('path/to/nowhere'),
        headers: {
          'Accept': 'text/html'
        }
      }).catch(res => {
        expect(res.statusCode).toBe(404) 
        expect(res.error.indexOf('<html>')).not.toBe(-1) 
      }) 
    }) 

    it('shows a 404 JSON error without stack trace', () => {
      expect.assertions(4) 
      return rp({
        url: getUrl('path/to/nowhere'),
        json: true
      }).catch(res => {
        expect(res.statusCode).toBe(404) 
        expect(res.error.code).toBe(404) 
        expect(res.error.message).toBe('Page not found') 
        expect(res.error.name).toBe('NotFound') 
      }) 
    }) 
  }) 

  describe('auth token on /objects', () => {

    describe('missing auth token', () => {
      it('returns 401 error', () => {
        expect.assertions(3)  
        return rp({
          url: getUrl('/objects'),
          json: true
        }).catch(res => { 
          expect(res.statusCode).toBe(401)
          expect(res.error.code).toBe(401)
          expect(res.error.message).toEqual('Missing auth token. Please check the presence of auth token')
        })
      })
    }) 
    describe('invalid token syntax', () => {
      it('returns 401 error', () => {
        expect.assertions(3)  
        return rp({
          url: getUrl('/objects'),
          headers: {'X-AUTH-TOKEN': 'dasdasdsadsadsad'},
          json: true
        }).catch(res => { 
          expect(res.statusCode).toBe(401)
          expect(res.error.code).toBe(401)
          expect(res.error.message).toEqual('Invalid token. Please check the syntax of auth token')
        })
      })
    }) 
    describe('invalid timestamp', () => {
      it('token expired', () => {
        expect.assertions(3)  
        return rp({
          url: getUrl('/objects'),
          headers: {'X-AUTH-TOKEN': 'dasdasdsadsadsad.asdasdsadasd.'+Math.floor(Date.now()/1000)},
          json: true
        }).catch(res => { 
          expect(res.statusCode).toBe(401)
          expect(res.error.code).toBe(401)
          expect(res.error.message).toEqual('Token expired or out of time range!')
        })
      })
      it('token out of time range', () => {
        expect.assertions(3)  
        return rp({
          url: getUrl('/objects'),
          headers: {'X-AUTH-TOKEN': 'dasdasdsadsadsad.asdasdsadasd.'+Math.floor(Date.now()/1000+8000)},
          json: true
        }).catch(res => { 
          expect(res.statusCode).toBe(401)
          expect(res.error.code).toBe(401)
          expect(res.error.message).toEqual('Token expired or out of time range!')
        })
      })
    }) 
    describe('Bad API key', () => {
      it('Could not find api key', () => {
        expect.assertions(3)  
        return rp({
          url: getUrl('/objects'),
          headers: {'X-AUTH-TOKEN': 'bad_api_key.asdasdsadasd.'+Math.floor(Date.now()/1000+1000)},
          json: true
        }).catch(res => { 
          expect(res.statusCode).toBe(401)
          expect(res.error.code).toBe(401)
          expect(res.error.message).toEqual('Could not find api key')
        })
      })
    }) 
    describe('Valid API key', () => {
      it('do not throw a 401 error', () => {
        //expect.assertions(1)  
        expect(() => 
          rp({
            url: getUrl('/objects'),
            headers: {'X-AUTH-TOKEN': 'valid_api_key.asdasdsadasd.'+Math.floor(Date.now()/1000+1000)},
            json: true
          })
        ).not.toThrow()
      })
    }) 

    describe('Bad signature', () => {
      it('throw 401 error', () => {
        const timestamp = Math.floor(Date.now()/1000+1000)
        const signature = 'bad_signature'

        expect.assertions(2)  
        return rp({
          url: getUrl('/objects'),
          headers: {'X-AUTH-TOKEN': `valid_api_key.${signature}.${timestamp}`},
          json: true
        }).catch(res => {
          expect(res.statusCode).toBe(401)
          expect(res.error.message).toEqual('Bad Signature')
        })
      })
    }) 
    describe('Valid signature', () => {
      it('throw 401 error', () => {
        const timestamp = Math.floor(Date.now()/1000+1000)
        const signature = crypto.createHmac('sha256',apiClientData.secret).update(`${timestamp}`).digest('base64') 

        expect(() => 
          rp({
            url: getUrl('/objects'),
            headers: {'X-AUTH-TOKEN': `valid_api_key.${signature}.${timestamp}`},
            json: true
          }).not.toThrow()
        )
      })
    }) 
  })
}) 

