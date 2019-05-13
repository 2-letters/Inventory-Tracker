using Firebase.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Firebase.Database.Query;
using System.Web;
using FireSharp.Config;
using Firebase;
using FireSharp.Interfaces;
using FireSharp.Response;
using LaboratoryOperatorV1._0.Models;


namespace LaboratoryOperatorV1._0.Data
{
    public class firebaseTest
    {

        IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "TmhsTfTPPZFeHiM6D4z8YY0vt2H4BnG4IXOJoFjB",
            BasePath = "https://laboratory-2letter.firebaseio.com"
        };

        IFirebaseClient client;


        public async Task FireBaseConnectAsync()
        {
            client = new FireSharp.FirebaseClient(config);


            FirebaseResponse response = await client.GetTaskAsync("labItems/");
            labItems todo = response.ResultAs<labItems>(); //The response will contain the data being retreived
        }







    }
}