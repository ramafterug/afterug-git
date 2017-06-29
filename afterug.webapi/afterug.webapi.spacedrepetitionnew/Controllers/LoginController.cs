using afterug.core.middlelayer;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography.X509Certificates;
using System.IdentityModel.Tokens;
using System.IdentityModel.Selectors;

using System.ServiceModel.Security.Tokens;

namespace afterug.webapi.spacedrepetitionnew.Controllers
{
   
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
            List<Users> users = new List<Users>();
            
            Users user = new Users();
            user.UserNameOrEmailAddress = "ramaece";
            user.Password = "ramaece";
            user.FirstName = "Ramachandran";
            user.LastName = "Arunachalam From Web API";
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
            return new HttpResponseMessage()
            {
                Content = new StringContent("Dummy for now", Encoding.UTF8, "application/json")
            };
        }

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpPost]
        [Route("api/authenticate")]
        public HttpResponseMessage Post([FromBody]Users value)
        {
            
            if (value.UserNameOrEmailAddress == "ramaece" && value.Password == "ramaece")
            {
                //var myAnonymousType = new
                //{
                //    Token="fake-jwt-token"

                //};
                //return "token: 'fake-jwt-token'";

                 

                TokenFromServer tokenobject = new TokenFromServer();
                tokenobject.token = GenerateToken(value.UserNameOrEmailAddress);

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

        [System.Web.Http.AcceptVerbs("GET", "POST")]
        [System.Web.Http.HttpPost]
        [Route("api/register")]
        public HttpResponseMessage Register([FromBody]Users value)
        {
            // Check if the emailaddress is already taken //No user names it will confuse
            var db = new afterugdevEntities1();
            var IsEmailAlreadyExists = db.Users.FirstOrDefault(o => o.UserNameOrEmailAddress == value.UserNameOrEmailAddress);
            if(IsEmailAlreadyExists == null)
            {
                value.EmailVerificationStatus = false;
                db.Users.Add(value);
                db.SaveChanges();

                string message = "Success";
                string json = Newtonsoft.Json.JsonConvert.SerializeObject(message, Newtonsoft.Json.Formatting.Indented,
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
                string message = "User Already Exists";
                string json = Newtonsoft.Json.JsonConvert.SerializeObject(message, Newtonsoft.Json.Formatting.Indented,
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
            // Insert into database
            // Return success or failure
            // Redirect to login page



        }


      //  public const string Secret = "856FECBA3B06519C8DDDBC80BB080553"; // your symmetric

       /* public static string GenerateToken(string username, int expireMinutes = 20)
        {
            var symmetricKey = Convert.FromBase64String(Secret);
            var tokenHandler = new JwtSecurityTokenHandler();
            
            var now = DateTime.UtcNow;
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                        {
                        new Claim(ClaimTypes.Name, username)
                    }),

                Expires = now.AddMinutes(Convert.ToInt32(expireMinutes)),

                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(symmetricKey), SecurityAlgorithms.HmacSha256Signature)
            };

            var stoken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(stoken);

            return token;
        }


        private static void ValidateJwt(string jwt)
        {
            var handler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters()
            {
                ValidAudience = "https://my-rp.com",
                //SigningToken = new BinarySecretSecurityToken(Convert.FromBase64String(myBase64Key)),
                IssuerSigningTokens = new List<X509SecurityToken>() { new X509SecurityToken(
           X509
           .LocalMachine
           .My
           .Thumbprint
           .Find("UYTUYTVV99999999999YTYYTYTY88888888", false)
           .First()) },
                ValidIssuer = "https://my-issuer.com/trust/issuer",
                CertificateValidator = X509CertificateValidator.None,
                RequireExpirationTime = true
            };

            try
            {
                SecurityToken validatedToken;
                var principal = handler.ValidateToken(jwt, validationParameters, out validatedToken);
            }
            catch (Exception e)
            {

                Console.WriteLine("{0}\n {1}", e.Message, e.StackTrace);
            }

            Console.WriteLine();
        }
        */

            public static ValidateTokenAUG()
        {
            const string tokenString = @"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NlY3VyZS5leGFtcGxlLmNvbS8iLCJleHAiOjE0MTA4MTkzODAsImh0dHA6Ly9leGFtcGxlLmNvbS9vcmdudW0iOiI5ODc5ODc5ODciLCJodHRwOi8vZXhhbXBsZS5jb20vdXNlciI6Im1lQGV4YW1wbGUuY29tIiwiaWF0IjoxNDA4NDE5NTQwfQ.jW9KChUTcgXMDp5CnTiXovtQZsN4X-M-V6_4rzu8Zk8";
            JwtSecurityToken tokenReceived = new JwtSecurityToken(tokenString);

            byte[] keyBytes = Encoding.UTF8.GetBytes("secret");
            if (keyBytes.Length < 64 && tokenReceived.SignatureAlgorithm == "HS256")
            {
                Array.Resize(ref keyBytes, 64);
            }
            Microsoft.IdentityModel.Tokens.TokenValidationParameters validationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidateIssuer = false,
                AudienceUriMode = AudienceUriMode.Never,
                SigningToken = new BinarySecretSecurityToken(keyBytes),
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            ClaimsPrincipal claimsPrincipal = tokenHandler.ValidateToken(tokenReceived, validationParameters);
            IEnumerable<Claim> a = claimsPrincipal.Claims;
            foreach (var claim in a)
            {
                Console.WriteLine(claim);
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
