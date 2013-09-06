/**
 * User: katat
 * Date: 9/5/13
 * Time: 9:43 AM
 */
var assert = require("assert");
var should = require('should');
var request = require('supertest');
var app = require('./app');

describe('API tests', function(){
    describe('conversion test', function(){
        it('should convert the ico to png', function(done){
            request(app)
                .get('/http://www.iconarchive.com/download/i78683/iconka/meow-2/cat-acrobat.ico')
                .end(function(err, res){
                    console.log(err, res.body);
                    done()
                })
        })
    })
});