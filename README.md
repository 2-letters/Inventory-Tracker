# Laboratory.MVC

A project

To create Manual Auth:
```
GoogleCredential credential = GoogleCredential
            .FromFile(@"C:\Users\rjvarona\Documents\GitHub\Laboratory.MVC\LaboratoryOperatorV1.0\Laboratory-836fc4d08141.json");
ChannelCredentials channelCredentials = credential.ToChannelCredentials();
Channel channel = new Channel(FirestoreClient.DefaultEndpoint.ToString(), channelCredentials);
FirestoreClient firestoreClient = FirestoreClient.Create(channel);
FirestoreDb db = FirestoreDb.Create("laboratory-2letter", client: firestoreClient);

// Create a document with a random ID in the "labItems" collection.
CollectionReference collection = db.Collection("labItems");

Query query = collection;
QuerySnapshot querySnapshot = await query.GetSnapshotAsync();
foreach (DocumentSnapshot queryResult in querySnapshot.Documents)
{
    string name = queryResult.GetValue<string>("itemName");
    string description = queryResult.GetValue<string>("description");
    Console.WriteLine($"{name} {description}");
}
```
            
