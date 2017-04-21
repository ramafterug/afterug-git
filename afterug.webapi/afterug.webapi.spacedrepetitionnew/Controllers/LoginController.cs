using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace afterug.webapi.spacedrepetitionnew.Controllers
{
    public class User
    {
        public string username { get; set; }
        public string password { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }

    }
    public class TokenFromServer
    {
        public string token;
    }
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("api/users")]
        public HttpResponseMessage Get()
        {
            List<User> users = new List<User>();
            
            User user = new User();
            user.username = "ramaece";
            user.password = "ramaece";
            user.firstName = "Ramachandran";
            user.lastName = "Arunachalam From Web API";
            users.Add(user);
            return new HttpResponseMessage()
            {
                Content = new StringContent(JArray.FromObject(users).ToString(), Encoding.UTF8, "application/json")
            };
            
        }

        // GET: api/Login/5
        [HttpGet]
        [Route("api/users/{id}")]
        public HttpResponseMessage Get(int id)
        {
            User user = new User();
            user.username = "ramaece";
            user.password = "ramaece";
            user.firstName = "Ramachandran";
            user.lastName = "Now from web api";
            return new HttpResponseMessage()
            {
                Content = new StringContent(JArray.FromObject(user).ToString(), Encoding.UTF8, "application/json")
            };
        }

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpPost]
        [Route("api/authenticate")]
        public HttpResponseMessage Post([FromBody]User value)
        {
            
            if (value.username == "ramaece" && value.password == "ramaece")
            {
                //var myAnonymousType = new
                //{
                //    Token="fake-jwt-token"

                //};
                //return "token: 'fake-jwt-token'";

                TokenFromServer tokenobject = new TokenFromServer();
                tokenobject.token = "fake-jwt-token";

                string json = Newtonsoft.Json.JsonConvert.SerializeObject(tokenobject, Newtonsoft.Json.Formatting.Indented,
                new Newtonsoft.Json.JsonSerializerSettings()
                {
                    ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                }
                );


                return new HttpResponseMessage()
                {
                    Content = new StringContent(json, Encoding.UTF8, "application/json")
                };
            }
            else
            {
                TokenFromServer tokenobject = new TokenFromServer();
                tokenobject.token = "";
                string json = Newtonsoft.Json.JsonConvert.SerializeObject(tokenobject, Newtonsoft.Json.Formatting.Indented,
                 new Newtonsoft.Json.JsonSerializerSettings()
                 {
                     ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                 }
                 );


                return new HttpResponseMessage()
                {
                    Content = new StringContent(json, Encoding.UTF8, "application/json")
                };
            }

           
        }

        // PUT: api/Login/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Login/5
        public void Delete(int id)
        {
        }
    }
}
