using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using afterug.core.middlelayer;

namespace afterug.webapi.spacedrepetition.Controllers
{
    public class QuestionController : ApiController
    {

        // GET: api/Question
        public List<QuestionsRaw> Get()
        {
            var db = new afterugEntities();
            var query = (from b in db.QuestionsRaw
                         select b).ToList();
            return query;
        }

        // GET: api/Question/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Question
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Question/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Question/5
        public void Delete(int id)
        {
        }
    }
}
