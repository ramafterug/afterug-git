using afterug.core.middlelayer;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;

namespace afterug.webapi.spacedrepetitionnew.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class TestController : ApiController
    {
        [HttpGet]
        [Route("api/Test/User/{userID}")]
        public HttpResponseMessage GetTestQuestions(int userID)
        {
            var db = new afterugdevEntities12();

            db.Configuration.ProxyCreationEnabled = false;



            var NonMatchingChapterWiseQuestions = (from Questions in db.QuestionsAfterUG
                                                   where !db.TestChild.Any(f => f.QuestionID == Questions.QuestionID && f.UserID == userID) && !db.DontShowQuestion.Any(f => f.QuestionID == Questions.QuestionID && f.UserID == userID)
                                                   where (Questions.ChapterID != null)
                                                   select new
                                                   { QuestionID = Questions.QuestionID, ChapterID = Questions.ChapterID });


            var chapterIDList = NonMatchingChapterWiseQuestions
                                                   .GroupBy(g => g.ChapterID)
                                                   .Select(g => new 
                                                   {
                                                       ChapterID = g.Key,

                                                   });


            var listQuestionsAndChapters = new List<KeyValuePair<string, List<int>>>();
            foreach (var chapter in chapterIDList)
            {
                var QuestionIDArray = new List<int>();
                foreach (var item in NonMatchingChapterWiseQuestions)
                {
                    if (item.ChapterID == chapter.ChapterID)
                    {
                        QuestionIDArray.Add(item.QuestionID);
                    }

                }
                //shuffle the int list here itself
                QuestionIDArray = Shuffle<int>(QuestionIDArray);
                listQuestionsAndChapters.Add(new KeyValuePair<string, List<int>>(chapter.ChapterID.ToString(), QuestionIDArray));
            }

            // No of questions per test = 3. GEt this from Database
            int noOfQuestionsPerTest = 100;
           
            List<List<KeyValuePair<string, List<int>>>> chapterButtonAndQuestionList = new List<List<KeyValuePair<string, List<int>>>>();
            foreach (var item in listQuestionsAndChapters)
            {
                List<KeyValuePair<string, List<int>>> listQuestionsAndButtons = new List<KeyValuePair<string, List<int>>>();
                //var listQuestionsAndButtons = new List<KeyValuePair<string, List<int>>>();
                int noOfButtons = (item.Value.Count) / noOfQuestionsPerTest;
                int reminder = (item.Value.Count) % noOfQuestionsPerTest;
                int finalNoOfButtons;
                if (item.Value.Count % noOfQuestionsPerTest == 0)
                {
                    finalNoOfButtons = noOfButtons;
                }
                else
                {
                    finalNoOfButtons = noOfButtons + 1;
                }
                
                for(var i = 0; i < finalNoOfButtons; i++)
                {
                    //List<int> segment = new List<int>();
                    int index = ((noOfQuestionsPerTest * i) - 1) ;
                    
                    if (i == 0)
                    {
                        index = 0;
                    }
                    else
                    {
                        
                    }
                    int noOfItemsToFetch = noOfQuestionsPerTest;
                    int finalloopvalue = finalNoOfButtons - 1;
                    if (reminder != 0 && i == finalloopvalue)
                    {
                        noOfItemsToFetch = reminder;
                    }
                    //i=0 index=0 endvalue=|| i=1 index=2;i=2 index=5;i=3 index=8;i=4 index=11
                    List<int> range = item.Value.GetRange(index, noOfItemsToFetch);
                    //ChapterFromDB chapterFromDB = new ChapterFromDB(item.Key.ToString);
                    //chapterFromDB.ChapterID =  item.Key;

                    // JObject jObject = JObject.Parse(item.Key);
                    // JToken jUser = jObject["Key"];

                    

                    var buttonName = "btnchapter_" + item.Key + "_test_" + (i + 1); 
                    listQuestionsAndButtons.Add(new KeyValuePair<string, List<int>>(buttonName.ToString(), range));
                    
                }
                chapterButtonAndQuestionList.Add(listQuestionsAndButtons);
            }

            string json = Newtonsoft.Json.JsonConvert.SerializeObject(chapterButtonAndQuestionList, Newtonsoft.Json.Formatting.Indented,
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
        // GET: api/Test

        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        [Route("api/SaveTTOrSSAndISRData")]
            public HttpResponseMessage SaveTTOrSSAndISRData([FromBody]DataToBeSavedObject dataToBeSavedObject)
        {

            List<List<afterug.core.middlelayer.Attempts>> AttemptsToBeSaved = dataToBeSavedObject.AttemptsToBeSaved;
            List<int> MarkedQuestionsToBeSaved = dataToBeSavedObject.MarkedQuestionsToBeSaved;
            List<int> UnMarkedQuestionsToBeSaved = dataToBeSavedObject.UnMarkedQuestionsToBeSaved;
            List<int> DontShowQuestionsToBeSaved = dataToBeSavedObject.DontShowQuestionsToBeSaved;
            List<afterug.core.middlelayer.QuestionDifficulty> QuestionDifficultiesToBeSaved = dataToBeSavedObject.QuestionDifficultiesToBeSaved;
            int UserID = dataToBeSavedObject.UserID;

            var db = new afterugdevEntities12();
            //List<Company> companies = new List<Company>();
            #region SaveAttempts
            //listOfAttempts.ForEach(n => db.Attempts.AddRange(n));
            foreach (var attemptArray in AttemptsToBeSaved)
            {
                foreach (var attempt in attemptArray)
                {
                    db.Attempts.Add(attempt);
                }
            }



            #endregion

            #region SaveMarked
            foreach (var markedQID in MarkedQuestionsToBeSaved)
            {
                var alreadyMarkedObjectInDB = db.TestMarkAQuestion.FirstOrDefault(o => o.QuestionID == markedQID && o.UserID == UserID);

                if(alreadyMarkedObjectInDB == null)
                {
                    afterug.core.middlelayer.TestMarkAQuestion markedWord = new afterug.core.middlelayer.TestMarkAQuestion();
                    markedWord.QuestionID = markedQID;
                    markedWord.UserID = UserID;
                    db.TestMarkAQuestion.Add(markedWord);
                }
               
               

            }

            #endregion

            #region RemoveUnMarked

            foreach (var unMarkedQID in UnMarkedQuestionsToBeSaved)
            {
                var alreadyMarkedObjectInDB = db.TestMarkAQuestion.FirstOrDefault(o => o.QuestionID == unMarkedQID && o.UserID == UserID);

                if (alreadyMarkedObjectInDB == null)
                {
                    //afterug.core.middlelayer.TestMarkAQuestion markedWord = new afterug.core.middlelayer.TestMarkAQuestion();
                    //markedWord.QuestionID = markedQID;
                    //markedWord.UserID = UserID;
                    //db.TestMarkAQuestion.Add(markedWord);
                }
                else
                {
                    
               
                    db.TestMarkAQuestion.Remove(alreadyMarkedObjectInDB);
                    //db.TestMarkAQuestion.Remove(o => o.QuestionID == unMarkedQID && o.UserID == UserID);
                }


            }

            #endregion


            #region SaveDontShow
            foreach (var dontShowQID in DontShowQuestionsToBeSaved)
            {
                var alreadyMarkedObjectInDB = db.TestMarkAQuestion.FirstOrDefault(o => o.QuestionID == dontShowQID && o.UserID == UserID);

                if (alreadyMarkedObjectInDB == null)
                {
                    afterug.core.middlelayer.DontShowQuestion dontShowWord = new afterug.core.middlelayer.DontShowQuestion();
                    dontShowWord.QuestionID = dontShowQID;
                    dontShowWord.UserID = UserID;
                    db.DontShowQuestion.Add(dontShowWord);
                }



            }

            #endregion

            #region SaveDifficulties


            foreach (var difficulty in QuestionDifficultiesToBeSaved)
            {
                if ((db.QuestionDifficulty.Any(o => o.QuestionID == difficulty.QuestionID && o.UserWhoRatedDifficultyID == difficulty.UserWhoRatedDifficultyID))) {

                    db.Entry(difficulty).State = System.Data.Entity.EntityState.Modified;

                    

                }
                else
                {
                    db.QuestionDifficulty.Add(difficulty);
                }
                
            }
            #endregion

            #region FinalContextSaveChanges
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

            
            #endregion
            return new HttpResponseMessage()
            {
                Content = new StringContent("Success", Encoding.UTF8, "application/json")
            };

            // DO other saving here
        }
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        public List<T> Shuffle<T>(List<T> list)
        {
            RNGCryptoServiceProvider provider = new RNGCryptoServiceProvider();
            int n = list.Count;
            while (n > 1)
            {
                byte[] box = new byte[1];
                do provider.GetBytes(box);
                while (!(box[0] < n * (Byte.MaxValue / n)));
                int k = (box[0] % n);
                n--;
                T value = list[k];
                list[k] = list[n];
                list[n] = value;
            }
            return list;
        }
        // GET: api/Test/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Test
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Test/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Test/5
        public void Delete(int id)
        {
        }
    }

    public class ChapterFromDB
    {

        public ChapterFromDB(string json)
        {
            JObject jObject = JObject.Parse(json);
            JToken jUser = jObject["Key"];
            this.ChapterID = (int)jUser["ChapterID"];
        }
        public int? ChapterID { get; set; }
    }

    public class DataToBeSavedObject
    {
        public List<List<afterug.core.middlelayer.Attempts>> AttemptsToBeSaved { get; set; }
        public List<int> MarkedQuestionsToBeSaved { get; set; }
        public List<int> UnMarkedQuestionsToBeSaved { get; set; }
        public List<int> DontShowQuestionsToBeSaved { get; set; }
        public List<afterug.core.middlelayer.QuestionDifficulty> QuestionDifficultiesToBeSaved { get; set; }
        public int UserID { get; set; }

        
    }
}
