using System;
using System.Reflection;

namespace afterug.webapi.spacedrepetitionnew.Areas.HelpPage.ModelDescriptions
{
    public interface IModelDocumentationProvider
    {
        string GetDocumentation(MemberInfo member);

        string GetDocumentation(Type type);
    }
}