using Firebase.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Firebase.Database.Query;
using System.Web;

namespace LaboratoryOperatorV1._0.Data
{
    public class firebaseTest
    {
        var auth = "ABCDE"; // your app secret
        var firebaseClient = new FirebaseClient(
          "<URL>",
          new FirebaseOptions
          {
              AuthTokenAsyncFactory = () => Task.FromResult(auth)
          });

    }
}