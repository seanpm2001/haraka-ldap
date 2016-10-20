'use strict';

var fixtures     = require('haraka-test-fixtures');
var ldappool     = require('../../../plugins/ldappool.js');

// test user data as defined in testdata.ldif
var users = [
    {
        uid : 'user1',
        dn : 'uid=user1,ou=users,dc=my-domain,dc=com',
        password : 'ykaHsOzEZD',
        mail : 'user1@my-domain.com'
    },
    {
        uid : 'user2',
        dn : 'uid=user2,ou=people,dc=my-domain,dc=com',
        password : 'KQD9zs,LGv',
        mail : 'user2@my-domain.com'
    },
    {
        uid : 'nonuniqe',
        dn : 'uid=nonunique,ou=users,dc=my-domain,dc=com',
        password : 'CZVm3,BLlx',
        mail : 'nonuniqe1@my-domain.com'
    },
    {
        uid : 'nonuniqe',
        dn : 'uid=nonunique,ou=people,dc=my-domain,dc=com',
        password : 'LsBHDGorAh',
        mail : 'nonuniqe2@my-domain.com'
    }
];
var _set_up =
        function (done) {
    this.users = users;
    this.plugin = new fixtures.plugin('auth/authz_ldap');
    this.plugin.cfg = {};
    this.connection = fixtures.connection.createConnection();
    this.plugin.init_authz_ldap(function(){}, {
        notes : {
            ldappool : new ldappool.LdapPool({
                binddn : this.users[0].dn,
                bindpw : this.users[0].password,
                basedn : 'dc=my-domain,dc=com'
            })
        }
    });
    done();
};

exports._verify_address = {
    setUp : _set_up,
    '1 entry' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    },
    '0 entries' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    },
    '2 entries' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    },
    'invalid search filter' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    },
    'no pool' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    }
};

exports._get_search_conf = {
    setUp : _set_up,
    'get defaults' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    },
    'get userdef' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    }
};

exports.register = {
    setUp : _set_up,
    'set master and child hooks to gain pool access' : function(test) {
        test.expect(7);
        test.equals(false, this.plugin.register_hook.called);
        this.plugin.register();
        test.equals('init_master', this.plugin.register_hook.args[0][0]);
        test.equals('init_child', this.plugin.register_hook.args[1][0]);
        test.equals('mail', this.plugin.register_hook.args[2][0]);
        test.equals('init_authz_ldap', this.plugin.register_hook.args[0][1]);
        test.equals('init_authz_ldap', this.plugin.register_hook.args[1][1]);
        test.equals('check_authz', this.plugin.register_hook.args[2][1]);
        test.done();
    },
    'load configuration file' : function(test) {
        var plugin = this.plugin;
        test.expect(2);
        this.plugin.register();
        test.equals('sub', plugin.cfg.main.scope);
        test.equals('(&(objectclass=*)(uid=%u)(mailLocalAddress=%a))', plugin.cfg.main.searchfilter);
        test.done();
    }
};

exports.init_authz_ldap = {
    setUp : _set_up,
    'call next' : function(test) {
        var plugin = this.plugin;
        test.expect(1);
        var callback = function() {
            test.ok(true);
            test.done();
        };
        plugin.init_authz_ldap(callback, { notes : { ldappool : {} } });
    },
    'no pool' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    }
};

exports.check_authz = {
    setUp : _set_up,
    'test denysoft' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    },
    'test deny' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    },
    'test ok' : function(test) {
        test.expect(0);
        // TODO
        test.done();
    }
};
