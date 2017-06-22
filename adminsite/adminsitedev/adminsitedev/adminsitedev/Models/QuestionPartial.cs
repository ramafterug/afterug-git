using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using adminsitedev;
using System.ComponentModel;

namespace adminsitedev.Models
{
  

    
    [MetadataType(typeof(UserProfileMetadata))]
    public partial class Question
    {
        internal sealed class UserProfileMetadata
        {
            [UIHint("tinymce_jquery_full"), AllowHtml]
            [Required]
            [DisplayName("Actual Question")]
            public string QuestionOriginal { get; set; }

            [UIHint("tinymce_jquery_full"), AllowHtml]
            [Required]
            [DisplayName("Answer Explanation")]
            public string Explanation { get; set; }
        }
    }
}