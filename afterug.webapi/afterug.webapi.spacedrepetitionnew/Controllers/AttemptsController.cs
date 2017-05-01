using afterug.core.middlelayer;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace afterug.webapi.spacedrepetitionnew.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class AttemptsController : ApiController
    {
        // GET: api/Attempts
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Attempts/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Attempts
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage Post([FromBody]List<Attempts> listOfAttempts)
        {
            var db = new afterugdevEntities4();
            //List<Company> companies = new List<Company>();

            //listOfAttempts.ForEach(n => db.Attempts.AddRange(n));
            foreach(var attempt in listOfAttempts)
            {
                
                db.Attempts.Add(attempt);
            }

            try
            {
                // Your code...
                // Could also be before try if you know the exception occurs in SaveChanges

                db.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    System.Diagnostics.Debug.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        System.Diagnostics.Debug.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }

           

            return new HttpResponseMessage()
            {
                Content = new StringContent("Success", Encoding.UTF8, "application/json")
            };

        }

        // PUT: api/Attempts/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Attempts/5
        public void Delete(int id)
        {
        }
    }
}
