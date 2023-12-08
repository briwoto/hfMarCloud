# hfProb3

[Custom foo description](## Part)

[Answer for Part A](#part-a)

[Answer for Part-B](#part-b-integration-with-salesforce-marketing-cloud-api)

## Part A

### How to run the code

#### 1. clone the repo

```
git@github.com:briwoto/hfMarCloud.git
```

#### 2. Yarn

Install yarn, if not already installed

```
npm install --global yarn
```

#### 3. Install dependencies

```
yarn install
```

#### 4. Start the server

```
yarn start
```

### Run the API

You may use postman or simply run the below url in the browser to see the response

```
http://localhost:3000/usdata
```

The code implements a simple nodejs express app to get data using RestAPI.  
It has three layers:  
<br>

## 1. App layer

This layer exposes the endpoints to the user, to run the endpoint and fetch the data.

_Auhentication implementation for the future_  
Since this is a backend system, using JWT for authentication would be a standard way to setup an auth layer.

Here's a high-level explanation for authentication setup

> Assumption: User is logged in to the front-end app, if any, such that the `/api/login` function signs a token using `secretKey`

**1. Implement auth/index.js**

```
const jwt = require('jsonwebtoken');

export const authenticateToken = (req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
}
```

**2. Use authentication in route file**  
`app.js`

```
import routes from './src/routes/appRoutes';

...
...


app.use('/api', authenticateToken, routes);
```

**3. Modify routes**  
`routes/appRoutes.js`

```
app.get('/api/myendpoint', authenticateToken, (req, res) => {
  ... code here remains unchanged
});
```

## 2. Control Layer

This layer contains the business logic or any other operations that need to be performed before sending the data back to the user. This helps gain the following advantages:

1. Modularity  
   The code is easy to read and understand compared to the scenario where you would have multiple tasks being handled in a single file/layer

2. Maintenance  
   When the API version is upgraded or business logic is changed, or authentication mechanism is modified, is becomes easier to alter only a part of the code if the architecture is setup correctly. Changes in one part of the application do not affect other parts as long as the interfaces remain consistent. This reduces the risk of unintended side effects and makes the codebase more maintainable.

3. Testing  
   It is easier to test an isolated peice of code rather than a file with thousands of lines of code handling multiple logic. For example, business logic can be tested without involving the database or the user interface, leading to more focused and reliable tests.

4. Scalability  
   As the application grows, you can scale horizontally by adding new features or modules without significant impact on existing code. The separation of concerns allows for independent development of features.

## 3. Hooks (External) Layer

Dealing with APIs that don't directly belong to your code needs be handled separately. There is usually a requirement of our team consuming other team's APIs; or the need to fetch data from third-party APIs.

- Dealing with external APIs inside hooks isolates the code responsible for communicating with external APIs. This separation of concerns makes it easier to manage and understand the codebase

- It is easier to add a 'FailSafe' logic. Changes in the external API or updates to the API integration logic can be implemented in the hooks without affecting the core business logic of your application. This makes it easier to adapt to changes in external services

## Part B Integration with Salesforce Marketing Cloud API

    First and foremost, it is essential to realise that the inference based merely on population data may lack some aspects.  
    For most strategies, it is vital to consider other aspects - age demographies, insutrial growth, urban vs rural population; to name a few.  

    That being said, here are a few examples that may leverage population data successfully

#### **Compare our userbase with the population data**

DataUSA also provides population seggregation based on states (`api/data?drilldowns=State&measures=Population`). Using this, we can compare our userbase with the dataUSA.  

**Example**: We observe that the population in austin, TX is growing. Using SFMC API, we find the growth of our userbase in the state has not been great so far. This insight could be valuable in increase our user base. We can target first-time users through our campaigns. This can help tap in the user base that say, has reently moved in, and miss their regional food.  
Using SFMC, we can deliver targeted and personalised messages to attract first-time users in the area with growing population

#### Being discrete with downward trending population

Say, the population of a state is in a downward trend over the past few years. But upon reviewing the detailed analytics and reporting via SFMC API, we do not see significant change in the user engagement. This tells us that even though there is a decline in population, our userbase in this region is not impacted by this particular demogrpahic aspect. Thus, it could signify a proof-read of our campaigns working effectively, so that we can bring other areas to focus
