const rp = require('request-promise')
const url = require('url')
const app = require('../../src/app');
const crypto = require('crypto')

const { Pool }  = require('pg')
jest.mock('pg')

const port = app.get('port') || 3030;
const getUrl = pathname => url.format({
  hostname: app.get('host') || 'localhost',
  protocol: 'http',
  port,
  pathname
});

const apiClientData = {api_key: 'api_admin', secret: 'secret', name: 'Api admin', permissions: ['api_admin'], status: 'active' }
const client = {
  query: (params) => (
    {rows : params.text == 'SELECT * FROM clients WHERE api_key = "api_admin"' ? [apiClientData] : [] }
  ),
  release: jest.fn()
} 

beforeAll(() => {
  Pool.mockReset()
  Pool.mockImplementation(() => ({connect: ()  => client}))
})

describe('\'Clients\' service', () => {
  it('registered the service', () => {
    const service = app.service('clients');
    expect(service).toBeTruthy();
  });

  describe('authorization', () => {
    describe('non api admin token', () => {
      it('should return 401', () => {
        const timestamp = Math.floor(Date.now()/1000+1000)
        const signature = crypto.createHmac('sha256','some secret').update(`${timestamp}`).digest('base64') 

        expect.assertions(2)  
        return rp({
          url: getUrl('/clients'),
          headers: {'X-AUTH-TOKEN': `api_admin.${signature}.${timestamp}`},
          json: true
        }).catch(res => {
          expect(res.statusCode).toBe(401)
          expect(res.error.message).toEqual('Not Authorized')
        })
      })
    })
  })
});

