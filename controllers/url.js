const shortid = require('shortid');
const URL = require('../models/url')
async function handleGenerateNewShortURL(req,res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'})
  const shortID = shortid();
  const allUrls = await URL.find();
  await URL.create(
    {
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    }
  );
  res.redirect(`/?id=${shortID}`);
  // return res.render("home", {
  //   id:shortID,
  //   urls: allUrls
  // })
}

async function handleGetAnalytics(req,res){
  const shortId = req.params.shortId;
  const result = await URL.findOne({shortId});
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

// URL DELETE

async function handleUrlDelete(req, res) {
  try {
    const { id } = req.params; 

    const result = await URL.deleteOne({ shortId: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleUrlDelete
}

