'use strict';
jest.autoMockOff();

var last = require('lodash/last');

jest.mock('../../lib/getJSONP');
var getJSONP = require('../../lib/getJSONP');
var results = { results: [], meta: {}};
getJSONP.mockImplementation(function(_, callback) { callback(results); });

var campaigns = require('../campaigns');

describe('campaigns', function() {
  beforeEach(function() {
    getJSONP.mockClear();
  });

  describe('find', function() {
    it('gets a campaign by uid', function() {
      var callback = jest.genMockFunction();
      campaigns.find('xy-12', callback);

      expect(getJSONP).lastCalledWith(
        'https://everydayhero.com/api/v2/campaigns/xy-12.jsonp', callback);
      expect(callback).toBeCalledWith(results);
    });

    it('accepts options', function() {
      var callback = jest.genMockFunction();
      campaigns.find('xy-12', callback, {
        excludeCharities: true,
        excludePages: true
      });

      expect(getJSONP.mock.calls[0][0]).toContain('exclude_charities=true');
      expect(getJSONP.mock.calls[0][0]).toContain('exclude_pages=true');
    });
  });

  describe('findBySlug', function() {
    it('gets a campaign by country and slug', function() {
      var callback = jest.genMockFunction();
      campaigns.findBySlug('xy', 'slugathon-2015', callback);

      expect(getJSONP).lastCalledWith(
        'https://everydayhero.com/api/v2/campaigns/xy/slugathon-2015.jsonp', callback);
      expect(callback).toBeCalledWith(results);
    });

    it('accepts options', function() {
      var callback = jest.genMockFunction();
      campaigns.findBySlug('xy', 'slugathon-2015', callback, {
        excludeCharities: true,
        excludePages: true
      });

      expect(getJSONP.mock.calls[0][0]).toContain('exclude_charities=true');
      expect(getJSONP.mock.calls[0][0]).toContain('exclude_pages=true');
    });
  });

  describe('findByUids', function() {
    it('gets campaigns by uid', function() {
      var callback = jest.genMockFunction();
      campaigns.findByUids(['xy-123', 'xy-456'], callback);

      expect(last(getJSONP.mock.calls)[0]).toEqual('https://everydayhero.com/api/v2/campaigns.jsonp?ids=xy-123,xy-456');
      expect(callback).toBeCalledWith(results);
    });

    it('accepts options', function() {
      var callback = jest.genMockFunction();
      campaigns.findByUids(['xy-123', 'xy-456'], callback, {
        status: 'active',
        sortBy: 'finish_at',
        excludeCharities: true,
        excludePages: true,
        excludeBau: true
      });

      expect(getJSONP.mock.calls[0][0]).toContain('status=active');
      expect(getJSONP.mock.calls[0][0]).toContain('sort_by=finish_at');
      expect(getJSONP.mock.calls[0][0]).toContain('exclude_charities=true');
      expect(getJSONP.mock.calls[0][0]).toContain('exclude_pages=true');
      expect(getJSONP.mock.calls[0][0]).toContain('exclude_bau=true');
    });

    describe('with empty array', function() {
      var callback;

      beforeEach(function() {
        callback = jest.genMockFunction();
        campaigns.findByUids([], callback);
      });

      it('does not fetch results', function() {
        expect(getJSONP).not.toBeCalled();
      });

      it('defers callback with empty results', function() {
        expect(callback).not.toBeCalled();

        jest.runOnlyPendingTimers();

        expect(callback).toBeCalledWith({ campaigns: [] });
      });
    });
  });

  describe('findByCharity', function() {
    it('gets campaigns that include the given charity uid', function() {
      var callback = jest.genMockFunction();
      campaigns.findByCharity('xy-123', 1, 10, callback);
      expect(getJSONP).lastCalledWith(
        'https://everydayhero.com/api/v2/campaigns.jsonp?charity_id=xy-123&page=1&limit=10', callback);
      expect(callback).toBeCalledWith(results);
    });

    it('accepts options', function() {
      var callback = jest.genMockFunction();
      campaigns.findByCharity('xy-123', 1, 10, callback, {
        status: 'active',
        sortBy: 'finish_at',
        excludeCharities: true,
        excludePages: true,
        excludeBau: true
      });

      expect(getJSONP.mock.calls[0][0]).toContain('status=active');
      expect(getJSONP.mock.calls[0][0]).toContain('sort_by=finish_at');
      expect(getJSONP.mock.calls[0][0]).toContain('exclude_charities=true');
      expect(getJSONP.mock.calls[0][0]).toContain('exclude_pages=true');
      expect(getJSONP.mock.calls[0][0]).toContain('exclude_bau=true');
    });
  });

  describe('leaderboard', function() {
    it('gets campaign leaderboard by campaign uid', function() {
      var callback = jest.genMockFunction();
      campaigns.leaderboard('xy-123', 'abcd', 'foo', 12, callback);

      expect(last(getJSONP.mock.calls)[0]).toEqual('https://everydayhero.com/api/v2/campaigns/xy-123/leaderboard.jsonp?type=foo&limit=12&charity_ids=abcd');
      expect(callback).toBeCalledWith(results);
    });

    it('accepts options', function() {
      campaigns.leaderboard('xy-123', 'abcd', 'foo', 12, function () {}, {
        includePages: true,
        includeFootprint: true,
        groupValue: 'ABC&group_value[]=DEF'
      });

      expect(getJSONP.mock.calls[0][0]).toContain('&include_pages=true');
      expect(getJSONP.mock.calls[0][0]).toContain('&include_footprint=true');
      expect(getJSONP.mock.calls[0][0]).toContain('&group_value[]=ABC&group_value[]=DEF');
    });
  });

  describe('leaderboardByUids', function() {
    it('gets multiple campaign leaderboards by campaign uids', function() {
      var callback = jest.genMockFunction();
      campaigns.leaderboardByUids(['ab-123', 'cd-456'], 'abcd', 'foo', 12, callback, {});
      expect(getJSONP.mock.calls.length).toBe(2);
      expect(getJSONP.mock.calls[0][0]).toContain('ab-123');
      expect(getJSONP.mock.calls[1][0]).toContain('cd-456');
      expect(last(getJSONP.mock.calls)[0]).toEqual('https://everydayhero.com/api/v2/campaigns/cd-456/leaderboard.jsonp?type=foo&limit=12&charity_ids=abcd');
      expect(callback.mock.calls.length).toBe(1);
    });
  });

  describe('leaderboardBySlug', function() {
    it('gets campaign leaderboard by country and slug', function() {
      var callback = jest.genMockFunction();
      campaigns.leaderboardBySlug('xy', 'slugathon-2015', 'foo', 12, callback);

      expect(last(getJSONP.mock.calls)[0]).toEqual('https://everydayhero.com/api/v2/campaigns/xy/slugathon-2015/leaderboard.jsonp?type=foo&limit=12');
      expect(callback).toBeCalledWith(results);
    });

    it('accepts options', function() {
      var callback = jest.genMockFunction();
      campaigns.leaderboardBySlug('xy', 'slugathon-2015', 'foo', 12, callback, {
        includePages: true,
        includeFootprint: true
      });

      expect(getJSONP.mock.calls[0][0]).toContain('&include_pages=true');
      expect(getJSONP.mock.calls[0][0]).toContain('&include_footprint=true');
    });
  });

  describe('search', function() {
    it('searches for campaigns', function() {
      var query = {
        searchTerm: 'bar',
        country: 'xy',
        page: 2,
        pageSize: 7,
        charityUuids: ['abc-123', 'xyz-456']
      };
      var callback = jest.genMockFunction();
      campaigns.search(query, callback);

      expect(last(getJSONP.mock.calls)[0]).toEqual('https://everydayhero.com/api/v2/search/campaigns.jsonp?q=bar&country_code=xy&page=2&page_size=7&charity_uuids=abc-123,xyz-456');
      expect(callback).toBeCalledWith(results);
    });
  });

  describe('giveCampaignUid', function() {
    it('returns uid for give campaign', function() {
      expect(campaigns.giveCampaignUid('au')).toBe('au-0');
      expect(campaigns.giveCampaignUid('ie')).toBe('ie-0');
      expect(campaigns.giveCampaignUid('nz')).toBe('nz-0');
      expect(campaigns.giveCampaignUid('uk')).toBe('gb-0');
      expect(campaigns.giveCampaignUid('us')).toBe('us-0');
      expect(campaigns.giveCampaignUid('xy')).toBeUndefined();
    });
  });
});
