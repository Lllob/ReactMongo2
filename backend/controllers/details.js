const router = require('express').Router(); //ot nod-moduele/express

const { getDataFromToken } = require('../util/generateToken')
const { createPost, getPostById, editPost, deletePost, buyer, likesPost, getProfil, getShopping } = require('../services/create') //
const { isUser, isOwner } = require('../middlewares/guards')
const errorMapper = require('../util/errorMapper');


/////////////////////////////////////////
//Create  
router.post('/create', isUser(), async (req, res) => { 
    
  const post = {
      title: req.body.title, 
      imageUrl: req.body.imageUrl,           
      description: req.body.description,  
      price: req.body.price,
      type: req.body.type,
      owner: req.body.owner,
  }

  try {    
      const result = await createPost(post) 
      res.json(result); 
  } catch(err) {
      console.error(err);
      const message = errorMapper(err);
      res.status(400).json({ message });    
  }
  
})

//Details 
router.get('/details/:id', isUser() , async (req, res) => {  
  const id = req.params.id; //take /:id 
    try {
    const post = await getPostById(id)
      if (post) {
      res.status(200).json(post);
     }
   } catch(err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }                                      
  
  });
///////////////////////////////////

//Edit 
  router.put('/edit/:id',isOwner(), async(req, res) => {  
     
    const post = {
      title: req.body.title,
      imageUrl: req.body.imageUrl, 
      description: req.body.description,
      price: req.body.price,
      type: req.body.type,
      //owner: req.body.owner, //ne go promenqme
    }
   
    try {
      const id = req.params.id;
        const result = await editPost(id, post)
        res.status(200).json(result); //davame dannite na frontenda
        
    } catch (err) {
      console.error(err);
      const message = errorMapper(err);
      res.status(400).json({ message });
    }
});
/////////////////////////////

//Delete
router.get('/delete/:id', isOwner(), async (req, res) => { 
  const id = req.params.id; 
   try {
        const result = await deletePost(id)
        res.status(200).json(result);
    } catch (err) {
      console.error(err);
      const message = errorMapper(err);
      res.status(400).json({ message });
   }        
 })
////////////////////////////

//buyer
router.put('/buy/:id', isUser(), async (req, res) => {
    const postId = req.params.id; 
       const accessToken = req.header('x-authorization')
        const userDataToken = await getDataFromToken(accessToken)
    try {
       const result = await buyer(postId, userDataToken.id._id)
       res.status(200).json(result);
    } catch (err) {
        console.error(err);
        const message = errorMapper(err);
        res.status(400).json({ message });
     } 
   
  })
  ////////////////////////////////////

  //Likes
router.put('/likes/:id', isUser(), async (req, res) => {
     const postId = req.params.id;
     const accessToken = req.header('x-authorization')
     const userDataToken = await getDataFromToken(accessToken)
  try {
     const result = await likesPost(postId, userDataToken.id._id)
     res.status(200).json(result);
  } catch (err) {
      console.error(err);
      const message = errorMapper(err);
      res.status(400).json({ message });
   } 
 
})
//////////////////////////////////

//My Profil //Mylist 
router.get('/mylist/:id', isUser(), async (req, res) => { 
  //const id = req.params.id
  const accessToken = req.header('x-authorization')
  const userDataToken = await getDataFromToken(accessToken)
  const userId = userDataToken.id._id;

  try {
    const posts = await getProfil(userId) 
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    const message = errorMapper(err);
    res.status(400).json({ message });
  }
 
});
///////////////////////////////

//My Shopping 
router.get('/shopping/:id', isUser(), async (req, res) => {  
  const accessToken = req.header('x-authorization')
  const userDataToken = await getDataFromToken(accessToken)
  const userId = userDataToken.id._id;

  try {
    const posts = await getShopping(userId)
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    const message = errorMapper(err);
    res.status(400).json({ message });
  }
});


module.exports = router;
