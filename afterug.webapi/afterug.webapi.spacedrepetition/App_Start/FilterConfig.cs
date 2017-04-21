using System.Web;
using System.Web.Mvc;

namespace afterug.webapi.spacedrepetition
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
