//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace afterug.core.middlelayer
{
    using System;
    using System.Collections.Generic;
    
    public partial class QuestionTags
    {
        public int QuestionTagsID { get; set; }
        public int QuestionID { get; set; }
        public int TagID { get; set; }
    
        public virtual QuestionsAfterUG QuestionsAfterUG { get; set; }
        public virtual Tags Tags { get; set; }
    }
}
