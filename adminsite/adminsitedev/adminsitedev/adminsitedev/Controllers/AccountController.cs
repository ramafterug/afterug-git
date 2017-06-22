using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace adminsitedev.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }


        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            if (username == "narphase1" && password == "SamNarRamFamily")
            {
                FormsAuthentication.SetAuthCookie(username, true);
                //FormsAuthentication.GetAuthCookie()
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return View();
            }

        }

        public ActionResult DeleteCookie()
        {
            //Set the cookie to expire
           // Response.Cookies["ASPXPIKESADMINAUTH"].Expires = DateTime.Now.AddDays(-1);
            FormsAuthentication.SignOut();
           // return View("Login","Account");
            return RedirectToAction("Login", "Account");
        }
    }
}
    