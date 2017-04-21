using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using afterug.webapi.spacedrepetition;


namespace afterug.webapi.spacedrepetition.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeControllerTest controller = new HomeControllerTest();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Home Page", result.ViewBag.Title);
        }
    }
}
