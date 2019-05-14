//using Firebase.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using Firebase.Database.Query;
using System.Web;
//using FireSharp.Config;
//using Firebase;
//using FireSharp.Interfaces;
//using FireSharp.Response;
using LaboratoryOperatorV1._0.Models;
using Google.Cloud.Firestore;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Grpc.Core;
using Grpc.Auth;
using Google.Cloud.Firestore.V1;
//using LaboratoryOperatorV1._0.Models;
using Newtonsoft.Json;
using LaboratoryOperatorV1._0.ViewModels;


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
            //from work desktop => @"C:\Users\rjvarona\Documents\GitHub\Laboratory.MVC\LaboratoryOperatorV1.0\Laboratory-836fc4d08141.json"
            //from home desktop => @"C:\Users\rjvar\Documents\GitHub\Laboratory.MVC\LaboratoryOperatorV1.0\Laboratory-836fc4d08141.json"
            GoogleCredential credential = GoogleCredential
            .FromFile(@"C:\Users\rjvar\Documents\GitHub\Laboratory.MVC\LaboratoryOperatorV1.0\Laboratory-836fc4d08141.json");
            ChannelCredentials channelCredentials = credential.ToChannelCredentials();
            Channel channel = new Channel(FirestoreClient.DefaultEndpoint.ToString(), channelCredentials);
            FirestoreClient firestoreClient = FirestoreClient.Create(channel);
            db = FirestoreDb.Create("laboratory-2letter", client: firestoreClient);
        }
        /// <summary>
        /// returning the query snpshot and using that as the model to read data from
        /// </summary>
        /// <returns></returns>
         public async Task<IReadOnlyList<DocumentSnapshot>> GetSnapshotInstance() {
            // Create a document with a random ID in the "users" collection.
            CollectionReference collection = db.Collection("labItems");

            // Query the collection for all documents where doc.Born < 1900.
            Query query = collection;
            QuerySnapshot querySnapshot = await query.GetSnapshotAsync();

           
            return querySnapshot;
        }


        /// <summary>
        /// get all items
        /// </summary>
        /// <returns></returns>
        public async Task<List<labItems>> GetAllItemsMethod2()
        {
           
            CollectionReference collection = db.Collection("labItems");

            
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


        /// <summary>
        /// return all labs for registered user
        /// for now we are Using Rudson Varona
        /// </summary>
        /// <returns></returns>
        public async Task GetAllLabsForUsersAsync()
        {

            CollectionReference collection = db.Collection("users/uY4N6WXX7Ij9syuL5Eb6/labs");
            
            Query query = collection;

            QuerySnapshot querySnapshot = await query.GetSnapshotAsync();

            List<LabsForUsers> LabsForUser = new List<LabsForUsers>();

            foreach (DocumentSnapshot queryResult in querySnapshot)
            {
                LabsForUser.Add(new LabsForUsers
                {
                    labName = queryResult.GetValue<string>("labName"),
                    description = queryResult.GetValue<string>("description")
                });


            }

            


            //Query allLabs = db.Collection("users/uY4N6WXX7Ij9syuL5Eb6/labs");
            //QuerySnapshot allLabsQuerySnapshot = await allLabs.GetSnapshotAsync();

            //List<LabsForUsers> LabsForUser = new List<LabsForUsers>();

            //foreach (DocumentSnapshot documentSnapshot in allLabsQuerySnapshot.Documents)
            //{
            //    if (documentSnapshot.Exists)
            //    {
            //        Console.WriteLine("Document data for {0} document:", documentSnapshot.Id);
            //        Dictionary<string, object> labs = documentSnapshot.ToDictionary();
            //        foreach (KeyValuePair<string, object> pair in labs)
            //        {
            //            Console.WriteLine("{0}: {1}", pair.Key, pair.Value);

            //            LabsForUser.Add(
            //               new LabsForUsers
            //               {
            //                   labName = documentSnapshot.GetValue<string>("labName"),
            //                   description = documentSnapshot.GetValue<string>("description")
            //               });
            //        }

            //    }
            //    else
            //    {
            //        Console.WriteLine("Document {0} does not exist!", documentSnapshot.Id);
            //    }
            //    //LabsForUser.Add(
            //    //   new LabsForUsers
            //    //   {
            //    //       labName = documentSnapshot.GetValue<string>("labName"),
            //    //       description = documentSnapshot.GetValue<string>("description")
            //    //   });
            //}



            //QuerySnapshot querySnapshot = await query.GetSnapshotAsync();
            ////DocumentReference documentRef = db.Collection("users/labs");

            //DocumentReference usersRef = db.Collection("users").Document("uY4N6WXX7Ij9syuL5Eb6").Collection("labs").Document("HNE4yRT70WGt9P4Eiexo");
           


            //IList<CollectionReference> subcollections = await usersRef.ListCollectionsAsync().ToList();
            

       
        }



















    }
}