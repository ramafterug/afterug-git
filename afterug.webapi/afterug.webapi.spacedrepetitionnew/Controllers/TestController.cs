using afterug.core.middlelayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace afterug.webapi.spacedrepetitionnew.Controllers
{
    public class TestController : Controller
    {

        [HttpGet]
        [Route("api/Test/User/{userID}")]
        public HttpResponseMessage GetTestQuestions(int userID)
        {
            var db = new afterugdevEntities3();

            db.Configuration.ProxyCreationEnabled = false;

            var Chapter1Questions = from Questions in db.QuestionsAfterUG
                                    //where (Questions.ChapterID == 1)
                                    select new { QuestionID = Questions.QuestionID, ChapterID = Questions.ChapterID };

            var NonMatchingChapter1 = (from Questions in Chapter1Questions
                                       where !db.TestChild.Any(f => f.QuestionID == Questions.QuestionID && f.UserID == userID)
                                       select new
                                       { QuestionID = Questions.QuestionID,ChapterID = Questions.ChapterID });

            


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
        // GET: Test
        public ActionResult Index()
        {
            return View();
        }

        // GET: Test/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Test/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Test/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Test/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Test/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Test/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Test/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
