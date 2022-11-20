const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    getSingleUser: async (parent, args, context) => {
      const foundUser = await User.findOne({ _id: context.user._id })
     
      if (!foundUser) {
        throw new AuthenticationError('Cannot find a user with this id!');
      }
  
      return foundUser;
    },
  },
  Mutation: {
    createUser: async (parent, body) => {
        const user = await User.create(body);
        
        if (!user) {
          throw new AuthenticationError('Something is wrong!')
        }

        const token = signToken(user)
    
        return { token, user };
    },

    login: async (parent, { email, password }) => {
        const user = await User.findOne({email: email });
        if (!user) {
          throw new AuthenticationError("Can't find this user");
        }
    
        const correctPw = await user.isCorrectPassword(password);
    
        if (!correctPw) {
          throw new AuthenticationError('Wrong password!');
        }
        const token = signToken(user);
        return { token, user };
    },
    
    addBook: async (parent, { newBook }, context) => {
      if (context.user){
        return User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { savedBooks: newBook } },
            { new: true, runValidators: true }
          );
      }

      //throw new AuthenticationError('You need to be logged in!');
    },

    deleteBook: async (parent, { bookId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
        );
      }

      throw new AuthenticationError("Couldn't find user with this id!")
    },
  }
}

module.exports = resolvers