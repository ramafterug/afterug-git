using System.Collections.ObjectModel;
using System.Net.Http;
using afterug.webapi.spacedrepetitionnew.MessageHandlers;

namespace afterug.webapi.spacedrepetitionnew
{
    public class HandlerConfig
    {
        public static void RegisterHandlers(Collection<DelegatingHandler> handlers)
        {
            handlers.Add(new CorsMessageHandler());
        }
    }
}