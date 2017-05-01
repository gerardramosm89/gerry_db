const graphql = require('graphql');
const _ = require('lodash');
const User = require('../models/user');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList
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

module.exports = new GraphQLSchema({
  query: RootQuery
});