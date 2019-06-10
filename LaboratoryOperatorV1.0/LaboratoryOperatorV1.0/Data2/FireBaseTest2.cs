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
        public IReadOnlyList<DocumentSnapshot> GetSnapshotInstance()
        {
            // Create a document with a random ID in the "users" collection.
            CollectionReference collection = db.Collection("labItems");

            // Query the collection for all documents where doc.Born < 1900.
            Query query = collection;
            QuerySnapshot querySnapshot =  query.GetSnapshotAsync().GetAwaiter().GetResult();


            return querySnapshot;
        }

       


        /// <summary>
        /// get all items
        /// </summary>
        /// <returns></returns>
        public List<labItems> GetAllItemsMethod2()
        {

            CollectionReference collection = db.Collection("labItems");


            Query query = collection;
            QuerySnapshot querySnapshot =  query.GetSnapshotAsync().GetAwaiter().GetResult();
            
       
            List<labItems> Brotherhood = new List<labItems>();

            foreach (DocumentSnapshot queryResult in querySnapshot)
            {
                Brotherhood.Add(new labItems
                {
                    itemName = queryResult.GetValue<string>("itemName"),
                    description = queryResult.GetValue<string>("description"),
                    pictureUrl = queryResult.GetValue<string>("pictureUrl"),
                    quantity = queryResult.GetValue<int>("quantity"),
                    location = queryResult.GetValue<string>("location"),
                    id = queryResult.Id
                });

            }
            return Brotherhood;
        }


        public string GetUserID()
        {
            Query query = db.Collection("users").WhereEqualTo("FirstName", "Rudson");
            QuerySnapshot querySnapshot =  query.GetSnapshotAsync().GetAwaiter().GetResult();
            var userID = querySnapshot.Documents[0].Id.ToString();

            return userID;
        }

        public List<labItems>GetItemsForLabs(string id)
        {

            string userID =   GetUserID();

            var model = new ViewLab();
           

            //here i am getting the list of equipments in the labs
            DocumentReference document = db.Collection("users").Document(userID).Collection("labs").Document(id);
            CollectionReference collection = db.Collection("users").Document(userID).Collection("labs").Document(id).Collection("equipments");
            Query query2 = collection;
            QuerySnapshot equipmentSanpshot =  query2.GetSnapshotAsync().GetAwaiter().GetResult();
            List<labItems> labItemsAdded = new List<labItems>();
            foreach (DocumentSnapshot queryResult in equipmentSanpshot)
            {
                labItemsAdded.Add(new labItems
                {
                    itemName = queryResult.GetValue<string>("itemName"),
                    description = queryResult.GetValue<string>("description"),
                    id = queryResult.Id,
                    location = queryResult.GetValue<string>("location"),
                    pictureUrl = queryResult.GetValue<string>("pictureUrl"),
                    quantity = queryResult.GetValue<int>("quantity")
                });
            }

            model.LabItems = labItemsAdded;


            return model.LabItems;

        }




        /// <summary>
        /// return all labs for registered user online
        /// for now we are Using Rudson Varona
        /// </summary>
        /// <returns></returns>
        public List<LabsForUsers> GetAllLabsForUsersAsync()
        {

            //CollectionReference collection = db.Collection("users").WhereEqualTo("FirstName","Rudson");
            //change the Rudson upon Login
            Query query = db.Collection("users").WhereEqualTo("FirstName", "Rudson");

            //CollectionReference collection = db.Collection("users");

            //Query query = collection;


            QuerySnapshot querySnapshot =  query.GetSnapshotAsync().GetAwaiter().GetResult();
            var id = querySnapshot.Documents[0].Id.ToString();





            CollectionReference collection = db.Collection("users").Document(id).Collection("labs");
            Query query2 = collection;
            QuerySnapshot labsSnapshot =  query2.GetSnapshotAsync().GetAwaiter().GetResult();

            List<LabsForUsers> LabsForUser = new List<LabsForUsers>();



            foreach (DocumentSnapshot queryResult in labsSnapshot)
            {
                LabsForUser.Add(new LabsForUsers
                {
                    labName = queryResult.GetValue<string>("labName"),
                    description = queryResult.GetValue<string>("description"),
                    id = queryResult.Id

                });
            }


            return LabsForUser;
        }

        /// <summary>
        /// this pushes a new lab assignment with added items
        /// </summary>
        /// <param name="labName"></param>
        /// <param name="labDescription"></param>
        /// <param name="itemsInLab"></param>
        /// <returns></returns>
        public void pushNewLabAsync(string labName, string labDescription, List<labItems> itemsInLab)
        {
            //get id of Rudson Varona
            Query query = db.Collection("users").WhereEqualTo("FirstName", "Rudson");

            QuerySnapshot querySnapshot =  query.GetSnapshotAsync().GetAwaiter().GetResult();
            var id = querySnapshot.Documents[0].Id.ToString();



            Dictionary<string, object> labs = new Dictionary<string, object>
            {
                  { "description", labDescription },
                  { "labName", labName }
            };
            //this posts it up
            DocumentReference addedDocRef =  db.Collection("users").Document(id).Collection("labs").AddAsync(labs).GetAwaiter().GetResult();






            //getting the id of the second application
            Query query2 = db.Collection("users").Document(id).Collection("labs").WhereEqualTo("labName", labName);

            QuerySnapshot querySnapshot2 =  query2.GetSnapshotAsync().GetAwaiter().GetResult();
            var id2 = querySnapshot2.Documents[0].Id.ToString();

            //creatging the collection reference here

            //bad method since we are posting several times this is very bad
            foreach (var item in itemsInLab)
            {
                Dictionary<string, object> itemsInDocument = new Dictionary<string, object>
                {
                  { "itemName", item.itemName },
                  { "location", item.location},
                  { "quantity", item.quantity },
                  {"description", item.description },
                  {"pictureUrl", item.pictureUrl}
                };

                DocumentReference addedDocRef2 =  db.Collection("users").Document(id).Collection("labs").Document(id2)
                    .Collection("equipments").AddAsync(itemsInDocument).GetAwaiter().GetResult();

            }
            //getting the id of the third to store items
            Query query3 = db.Collection("users").Document(id).Collection("labs").Document(id2).
                Collection("equipments").WhereEqualTo("labName", labName);

            QuerySnapshot querySnapshot3 =  query3.GetSnapshotAsync().GetAwaiter().GetResult();
            var id3 = querySnapshot3.Documents[0].Id.ToString();



        }


        public  labs GetLabDetails(string id)
        {
            string userID =  GetUserID();

            var model = new labs();


            //here i am getting the list
            DocumentReference document = db.Collection("users").Document(userID).Collection("labs").Document(id);
            DocumentSnapshot snapshot =  document.GetSnapshotAsync().GetAwaiter().GetResult();
            if (snapshot.Exists)
            {
                model.labName = snapshot.GetValue<string>("labName");
                model.description = snapshot.GetValue<string>("description");
            }
            else
            {
                Console.WriteLine("Document {0} does not exist!", snapshot.Id);
            }


            return model;

         
        }
















    }
}