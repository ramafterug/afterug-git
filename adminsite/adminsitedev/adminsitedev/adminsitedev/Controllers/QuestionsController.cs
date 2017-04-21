using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using adminsitedev;
using System.Data.Entity.Validation;
using adminsitedev.Models;
namespace adminsitedev.Controllers
{
    [Authorize]
    public class QuestionsController : Controller
    {
        private adminsitedevEntities1 db = new adminsitedevEntities1();

        // GET: Questions
        public ActionResult Index()
        {
            return View(db.Questions.ToList());
        }

        // GET: Questions/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Question question = db.Questions.Find(id);
            if (question == null)
            {
                return HttpNotFound();
            }
            return View(question);
        }

        // GET: Questions/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Questions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "QuestionID,QuestionType,QuestionOriginal,ChoiceAOriginal,ChoiceBOriginal,ChoiceCOriginal,ChoiceDOriginal,CorrectChoiceOriginal,QuestionMainCategory,QuestionSubCategory,IsPreviousYearExamQuestion,WhichExam,WhichYear,QuestionSpinned,ChoiceASpinned,ChoiceBSpinned,ChoiceCSpinned,ChoiceDSpinned,CorrectChoiceSpinned,ErrorsSpinned,JustificationsFinal,ReviewComments,ResponseReviewComments,QuestionFinal,ChoiceAFinal,ChoiceBFinal,ChoiceCFinal,ChoiceDFinal,CorrectChoiceFinal,QuestionLive,ChoiceALive,ChoiceBLive,ChoiceCLive,ChoiceDLive,CorrectChoiceLive,IsCorrectChoiceVerified,IsQuestionSpinned,IsFinalReviewCompleted,IsPeerCrossReviewCompleted,IsQuestionReadyForLive,BookPageNumber,BookQuestionNumber,OurQuestionNumber")] Question question)
        {
            if (ModelState.IsValid)
            {
                db.Questions.Add(question);
                

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


                return RedirectToAction("Index");
            }

            return View(question);
        }

        // GET: Questions/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Question question = db.Questions.Find(id);
            if (question == null)
            {
                return HttpNotFound();
            }
            return View(question);
        }

        // POST: Questions/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "QuestionID,QuestionType,QuestionOriginal,ChoiceAOriginal,ChoiceBOriginal,ChoiceCOriginal,ChoiceDOriginal,CorrectChoiceOriginal,QuestionMainCategory,QuestionSubCategory,IsPreviousYearExamQuestion,WhichExam,WhichYear,QuestionSpinned,ChoiceASpinned,ChoiceBSpinned,ChoiceCSpinned,ChoiceDSpinned,CorrectChoiceSpinned,ErrorsSpinned,JustificationsFinal,ReviewComments,ResponseReviewComments,QuestionFinal,ChoiceAFinal,ChoiceBFinal,ChoiceCFinal,ChoiceDFinal,CorrectChoiceFinal,QuestionLive,ChoiceALive,ChoiceBLive,ChoiceCLive,ChoiceDLive,CorrectChoiceLive,IsCorrectChoiceVerified,IsQuestionSpinned,IsFinalReviewCompleted,IsPeerCrossReviewCompleted,IsQuestionReadyForLive")] Question question)
        {
            if (ModelState.IsValid)
            {
                db.Entry(question).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(question);
        }

        // GET: Questions/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Question question = db.Questions.Find(id);
            if (question == null)
            {
                return HttpNotFound();
            }
            return View(question);
        }

        // POST: Questions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Question question = db.Questions.Find(id);
            db.Questions.Remove(question);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
