using MCPAProject.Models;
using System.Web.Mvc;

namespace MCPAProject.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Student_info()
        {
            return View();
        }

        public ActionResult RedirectPage(studName model)
        {
            if (model.PojNames == Names.Siyabonga_Mkhize)
            {
                return Redirect("\\Student Profile\\Siyabonga Mkhize\\Siyabonga.html");
            }
            else
            {
                return RedirectToAction("Index");
            }
        }
    }
}