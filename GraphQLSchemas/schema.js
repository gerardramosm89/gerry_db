const graphql = require('graphql');
const _ = require('lodash');
const User = require('../models/user');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const axios = require('axios');

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: () => ({
    _id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3050/api/companies/${parentValue._id}/users`)
          .then(resp => resp.data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    admin: { type: GraphQLBoolean },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        console.log("Parent value is: ", parentValue);
        console.log("Args is: ", args);
        return axios.get(`http://localhost:3050/api/companies/${parentValue.companyId}`)
          .then(resp => {
            console.log("resp.data is: ", resp.data[0]);
            return resp.data[0];
          });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { _id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.post(`http://localhost:3050/api/user/${args._id}`)
          .then(resp => resp.data);
      }
    },
    company: {
      type: CompanyType,
      args: { _id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios.get(`http://localhost:3050/api/companies/${args._id}`)
          .then(resp => resp.data[0]);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: {type: new GraphQLNonNull(GraphQLString) },
        admin: { type: GraphQLBoolean },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { username, email, admin, password, companyId }) {
        return axios.post('http://localhost:3050/api/users', { username, email, password, admin, companyId }).then(resp => {
          return resp.data.user;
        });
      }
    },
    deleteUser: {
     type: UserType,
     args: {
       username: { type: new GraphQLNonNull(GraphQLString) },
       password: { type: new GraphQLNonNull(GraphQLString) }
     },
     resolve(parentValue, { username, password }) {
      return axios.delete('http://localhost:3050/api/users', { data: { username, password }})
        .then(resp => {
          console.log("data from deleteUser", resp.data);
          return resp.data.deletedUser;
        });
     }
    },
    editUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        email: { type: GraphQLString },
        admin: { type: GraphQLBoolean },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { username, password, email, admin, companyId }) {
        return axios.put('http://localhost:3050/api/users', { username, password, email, admin, companyId})
          .then(resp => {
            console.log("Response from edit user was: ", resp);
            return resp.data;
          })
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});