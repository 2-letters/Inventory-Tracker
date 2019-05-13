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
using Grpc.Core;
using Grpc.Auth;
using Google.Cloud.Firestore.V1;
using LaboratoryOperatorV1._0.Models;
using Newtonsoft.Json;

namespace LaboratoryOperatorV1._0.Data
{
    public class firebaseTest
    {

        private FirestoreDb db;
        /// <summary>
        /// firebaseTest authenticates the database to connect to Google API
        /// </summary>
        public firebaseTest()
        {
            GoogleCredential credential = GoogleCredential
            .FromFile(@"C:\Users\rjvarona\Documents\GitHub\Laboratory.MVC\LaboratoryOperatorV1.0\Laboratory-836fc4d08141.json");
            ChannelCredentials channelCredentials = credential.ToChannelCredentials();
            Channel channel = new Channel(FirestoreClient.DefaultEndpoint.ToString(), channelCredentials);
            FirestoreClient firestoreClient = FirestoreClient.Create(channel);
            db = FirestoreDb.Create("laboratory-2letter", client: firestoreClient);
        }
        /// <summary>
        /// returning the query snpshot and using that as the model to read data from
        /// </summary>
        /// <returns></returns>
         public async Task<IReadOnlyList<DocumentSnapshot>> GetAllItems() {
            // Create a document with a random ID in the "users" collection.
            CollectionReference collection = db.Collection("labItems");

            // Query the collection for all documents where doc.Born < 1900.
            Query query = collection;
            QuerySnapshot querySnapshot = await query.GetSnapshotAsync();

           
            return querySnapshot;
        }

        public async Task<List<labItems>> GetAllItemsMethod2()
        {
            // Create a document with a random ID in the "users" collection.
            CollectionReference collection = db.Collection("labItems");

            // Query the collection for all documents where doc.Born < 1900.
            Query query = collection;
            QuerySnapshot querySnapshot = await query.GetSnapshotAsync();

            List<labItems> Brotherhood = new List<labItems>();
         
            foreach(DocumentSnapshot queryResult in querySnapshot)
            {
                Brotherhood.Add(new labItems
                {
                    itemName = queryResult.GetValue<string>("itemName"),
                    description = queryResult.GetValue<string>("description"),
                    pictureUrl = queryResult.GetValue<string>("pictureUrl"),
                    quantity = queryResult.GetValue<int>("quantity")
                });
                
               
            }
            return Brotherhood;
        }


        

        public  async Task<List<labItems>> GetLabItems()
        {
            
            // Create a document with a random ID in the "users" collection.
            CollectionReference collection = db.Collection("labItems");

            // Query the collection for all documents where doc.Born < 1900.
            Query query = collection;
            QuerySnapshot querySnapshot = await query.GetSnapshotAsync();

            List<labItems> Items = new List<labItems>();

            foreach (DocumentSnapshot queryResult in querySnapshot.Documents)
            {
                //Items.Add(queryResult.GetValue<labItems>("itemName"));
                //Items.Add(queryResult.GetValue<labItems>("description"));
                //Items.Add(queryResult.GetValue<labItems>("pictureUrl"));
            }

            return Items;

        }

       



    }
}