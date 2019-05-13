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
using Google.Cloud.Firestore;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;

namespace LaboratoryOperatorV1._0.Data
{
    public class firebaseTest
    {

        IFirebaseConfig config = new FirebaseConfig
        {
            AuthSecret = "TmhsTfTPPZFeHiM6D4z8YY0vt2H4BnG4IXOJoFjB",
            BasePath = "https://laboratory-2letter.firebaseio.com"
        };

        IFirebaseClient client ;




        public async Task FireBaseConnectAsync()
        {

            FirestoreDb db = FirestoreDb.Create("laboratory-2letter");

            //client = new FireSharp.FirebaseClient(config);


            //FirebaseResponse response = await client.GetTaskAsync("labItems");
            //labItems todo = response.ResultAs<labItems>(); //The response will contain the data being retreived
            //var x = todo;

            CollectionReference usersRef = db.Collection("labItems");
            QuerySnapshot snapshot = await usersRef.GetSnapshotAsync();
         


        }



        // Some APIs, like Storage, accept a credential in their Create()
        // method.
        public object AuthExplicit(string projectId, string jsonPath)
        {
            // Explicitly use service account credentials by specifying 
            // the private key file.
            var credential = GoogleCredential.FromFile(jsonPath);
            var storage = StorageClient.Create(credential);
            // Make an authenticated API request.
            var buckets = storage.ListBuckets(projectId);
            foreach (var bucket in buckets)
            {
                Console.WriteLine(bucket.Name);
            }
            return null;
        }
      




    }
}