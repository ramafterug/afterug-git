﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using afterug.core.middlelayer;
using System.Web.Http.Cors;
using Newtonsoft.Json.Linq;
using System.Text;

namespace afterug.webapi.spacedrepetition.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class QuestionController : ApiController
    {

        // GET: api/Question
        public HttpResponseMessage Get()
        {
            var db = new afterugdevEntities5();

            var query = (from b in db.QuestionsAfterUG
                         select b).ToList();

            return new HttpResponseMessage()
            {
                Content = new StringContent(JArray.FromObject(query).ToString(), Encoding.UTF8, "application/json")
            };
            
        }


        // Add TestList Method GET
        // Add FetchTest POST


        // GET: api/Question/Test/1
        [HttpGet]
        [Route("api/Question/Test/{testNo}/User/{userID}")]
        public HttpResponseMessage GetTestQuestions(int testNo, int userID)
        {
            var db = new afterugdevEntities5();

            db.Configuration.ProxyCreationEnabled = false;

            var questionsQuery = (from b in db.QuestionsAfterUG.AsNoTracking()
                                  where ((b.QuestionID >= (((testNo - 1) * 5) + 1) && b.QuestionID <= (testNo * 5)))
                                  select new
                                  {
                                      b.QuestionID,
                                      b.QuestionType,
                                      b.Question,
                                      b.IsQuestionReviewed,
                                      b.IsQuestionSpinned,
                                      b.IsCorrectChoiceVerified,
                                      b.CorrectChoiceID,
                                      b.Choices,
                                      b.ForgetNotes,
                                      b.QuestionTags,
                                      
                                      b.UserNotes,
                                      Attempts = b.Attempts.Where(a => a.UserID == userID)

                                  }).ToList();

            
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(questionsQuery, Newtonsoft.Json.Formatting.Indented,
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



        // GET: api/Question/5
        public string Get(int id)
        {
            return "value";
        }


        [HttpPost]
        [Route("api/Questions")]
        public HttpResponseMessage GetQuestionsByIDArray([FromBody]QuestionIDArrayAndUserID value)
        {

            int[] questionIDArray;
            int userID;
            questionIDArray = value.QuestionIDArray;
            userID = value.UserID;
            var db = new afterugdevEntities5();

            db.Configuration.ProxyCreationEnabled = false;

            var questionsQuery = (from b in db.QuestionsAfterUG.AsNoTracking()
                                  where questionIDArray.Contains(b.QuestionID)
                                  select new
                                  {
                                      b.QuestionID,
                                      b.QuestionType,
                                      b.Question,
                                      b.IsQuestionReviewed,
                                      b.IsQuestionSpinned,
                                      b.IsCorrectChoiceVerified,
                                      b.CorrectChoiceID,
                                      b.Choices,
                                      b.ForgetNotes,
                                      b.QuestionTags,
                                      
                                      b.UserNotes,
                                      Attempts = b.Attempts.Where(a => a.UserID == userID)

                                  }).ToList();


            string json = Newtonsoft.Json.JsonConvert.SerializeObject(questionsQuery, Newtonsoft.Json.Formatting.Indented,
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

    public class QuestionIDArrayAndUserID
    {
        public int[] QuestionIDArray { get; set; }
        public int UserID { get; set; }
    }
}
