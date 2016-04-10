var request = require('supertest');
var app = require('./../../app.js');

describe("The app", function(){
    it('should return 200 OK on GET /', function(done){
        request(app)
            .get('/')
            .expect(200)
            .end(function(err, res){
                if(err){
                    return done(err);
                }
                done();
            });
    });

    it('should return 200 OK on GET /byUser', function(done){
        request(app)
            .get('/byUser')
            .expect(200)
            .end(function(err, res){
                if(err){
                    return done(err);
                }
                done();
            });
    });

    it('should return HTML on GET /', function(done){
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=utf-8')
    });

    it('should return 404 on GET /notaroute', function(done) {
        request(app)
            .get('/notaroute')
            .expect(404, done);
    });

    it('should return 401 no Authorized on POST /userPost', function(done){
        request(app)
            .post('/twote')
            .send({ text: "test" })
            .expect(401, done);
    });
});

