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
    
    public partial class UserAfterUGNotes
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public UserAfterUGNotes()
        {
            this.ForgetNotes = new HashSet<ForgetNotes>();
        }
    
        public int UserAfterUGNotesID { get; set; }
        public int UserWhoCreatedNotesID { get; set; }
        public int QuestionID { get; set; }
        public bool IsToBeDisplayed { get; set; }
        public string NoteText { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<ForgetNotes> ForgetNotes { get; set; }
        public virtual QuestionsAfterUG QuestionsAfterUG { get; set; }
        public virtual Users Users { get; set; }
    }
}
