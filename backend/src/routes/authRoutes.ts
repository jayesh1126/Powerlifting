import express from 'express';
import passport from '../util/passport-setup'; 


const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect to the dashboard page.
  res.redirect('http://localhost:3000/dashboard');
});

export default router;
