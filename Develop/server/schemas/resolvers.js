const { User  } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
        books: async () => {
            return Book.find()
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id });

                return userData;
            }
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            console.log("args",args);
            const user = await User.create(args);
            const token = signToken(user);

            return { user, token };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect Credentials');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials');
            }
            const token = signToken(user);
            return { user, token };
        },
        saveBook: async (parent, { input }, context) => {
            console.log(context.user);
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: { ...input } } },
                    { new: true, runValidators: true }
                );
                return user;
            }
            throw new AuthenticationError('You need to log in!');
        },
        removeBook: async (parent, { bookId }, context) => {
            console.log(bookId);
            console.log(context.user);
            if (context.user) {
                const user = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true, runValidators: true }
                );
                return user;
            }
        }
    }
};

module.exports = resolvers;