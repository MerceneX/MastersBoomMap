const chai = require('chai');
const ContentRepository = require('../lib/content/general/infrastructure/ContentRepository');
const collections = require('../config/collections');
const getFromApi = require('../lib/content/modules/getFromAPI');
const urls = require('../lib/content/general/infrastructure/urls');
const Parsers = require('../lib/content/general/infrastructure/parsers');
const expect = chai.expect;
chai.use(require('chai-as-promised'));

describe('ContentRepository ', () => {
  describe('Testing ContentRepository for various branching paths', () => {
    it('should instantiate itself.', async () => {
      const Dummy = {};
      const actualResult = await new ContentRepository(Dummy);

      expect(actualResult).to.not.be.null;
    });

    it('should be able to run its primary method, regardless of input.', async () => {
      const ContentDAOStub = {
        getFromDB: async () => {
          return { message: 'ok' };
        },
        updateDB: async () => {
          return null;
        }
      };

      const contentRepository = await new ContentRepository({
        DAO: ContentDAOStub,
        parser: () => {
          return null;
        },
        getFromApi: () => {
          return null;
        }
      });

      const expectedResult = { items: [{ message: 'ok' }] };
      const actualResult = await contentRepository.getContent();
      expect(actualResult).to.be.deep.equal(expectedResult);
    });

    it('should run updateDB DAO method once per call', async () => {
      const contentDAOSpy = {
        getFromDB: async () => {},
        updatedDBTimesCalled: 0,
        updateDB: function async() {
          this.updatedDBTimesCalled = 1;
        }
      };

      const contentRepository = await new ContentRepository({
        DAO: contentDAOSpy,
        parser: () => {
          return null;
        },
        getFromApi: () => {
          return null;
        }
      });
      await contentRepository.getContent();
      const expectedResult = 1;
      const actualResult = contentDAOSpy.updatedDBTimesCalled;
      expect(actualResult).to.be.deep.equal(expectedResult);
    });

    it('should run getFromDB DAO method once per call', async () => {
      const contentDAOSpy = {
        getFromDBTimesCalled: 0,
        getFromDB: function async() {
          this.getFromDBTimesCalled = 1;
        },
        updateDB: function async() {}
      };

      const contentRepository = await new ContentRepository({
        DAO: contentDAOSpy,
        parser: () => {
          return null;
        },
        getFromApi: () => {
          return null;
        }
      });
      await contentRepository.getContent();

      const expectedResult = 1;
      const actualResult = contentDAOSpy.getFromDBTimesCalled;
      expect(actualResult).to.be.deep.equal(expectedResult);
    });

    it('should provide a parsed string to UpdateDB DAO method.', async () => {
      const contentDAOSpy = {
        getFromDB: function async() {},
        receivedParams: null,
        updateDB: function async(receivedParams) {
          this.receivedParams = receivedParams;
        }
      };

      const contentRepository = await new ContentRepository({
        DAO: contentDAOSpy,
        parser: () => {
          return Parsers.Borders;
        },
        getFromApi: () => {
          return '';
        }
      });
      await contentRepository.getContent();

      const actualResult = contentDAOSpy.receivedParams;
      expect(actualResult).to.not.be.null;
      expect(actualResult).to.not.be.undefined;
    });

    it('should provide a json object with an array of items provided by the DAO when called', async () => {
      const ContentDAOStub = {
        getFromDB: async () => {
          return {
            data: 'There is some actual data provided by the DAO object in here'
          };
        },
        updateDB: async () => {
          return null;
        }
      };

      const contentRepository = await new ContentRepository({
        DAO: ContentDAOStub,
        parser: () => {
          return null;
        },
        getFromApi: () => {
          return null;
        }
      });

      const expectedResult = {
        items: [
          {
            data: 'There is some actual data provided by the DAO object in here'
          }
        ]
      };
      const actualResult = await contentRepository.getContent();
      expect(actualResult).to.be.deep.equal(expectedResult);
    });
  });
});
