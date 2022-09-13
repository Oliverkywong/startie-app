import fakeRestProvider from 'ra-data-fakerest';
import { DataProvider } from 'react-admin';
import get from 'lodash/get';
import data from './data';
import addUploadFeature from './addUploadFeature';

const dataProvider = fakeRestProvider(data, true);

const addTagsSearchSupport = (dataProvider: DataProvider) => ({
    ...dataProvider,
    getList: (resource:any, params:any) => {
        if (resource === 'comments') {
            // partial pagination
            return dataProvider
                .getList(resource, params)
                .then(({ data, total }) => ({
                    data,
                    pageInfo: {
                        hasNextPage:
                            params.pagination.perPage * params.pagination.page <
                            total!,
                        hasPreviousPage: params.pagination.page > 1,
                    },
                }));
        }
        if (resource === 'tags') {
            const matchSearchFilter = Object.keys(params.filter).find(key =>
                key.endsWith('_q')
            );
            if (matchSearchFilter) {
                const searchRegExp = new RegExp(
                    params.filter[matchSearchFilter],
                    'i'
                );

                return dataProvider.getList(resource, {
                    ...params,
                    filter: item => {
                        const matchPublished =
                            item.published == params.filter.published; // eslint-disable-line eqeqeq

                        const fieldName = matchSearchFilter.replace(
                            /(_q)$/,
                            ''
                        );
                        return (
                            matchPublished &&
                            get(item, fieldName).match(searchRegExp) !== null
                        );
                    },
                });
            }
        }

        return dataProvider.getList(resource, params);
    },
});

const uploadCapableDataProvider = addUploadFeature(
    addTagsSearchSupport(dataProvider)
);

const sometimesFailsDataProvider = new Proxy(uploadCapableDataProvider, {
    get: (target, name) => (resource:any, params:any) => {
        if (typeof name === 'symbol' || name === 'then') {
            return;
        }
        // set session_ended=true in localStorage to trigger an API auth error
        if (localStorage.getItem('session_ended')) {
            const error = new Error('Session ended') as ResponseError;
            error.status = 403;
            return Promise.reject(error);
        }
        // add rejection by type or resource here for tests, e.g.
        // if (name === 'delete' && resource === 'posts') {
        //     return Promise.reject(new Error('deletion error'));
        // }
        if (
            resource === 'posts' &&
            params.data &&
            params.data.title === 'f00bar'
        ) {
            return Promise.reject(new Error('this title cannot be used'));
        }
        return uploadCapableDataProvider[name](resource, params);
    },
});

const delayedDataProvider = new Proxy(sometimesFailsDataProvider, {
    get: (target, name) => (resource:any, params:any) => {
        if (typeof name === 'symbol' || name === 'then') {
            return;
        }
        return new Promise(resolve =>
            setTimeout(
                () =>
                    resolve(sometimesFailsDataProvider[name](resource, params)),
                300
            )
        );
    },
});

interface ResponseError extends Error {
    status?: number;
}

export default delayedDataProvider;


// import { fetchUtils } from 'react-admin';
// import { stringify } from 'query-string';

// const apiUrl = 'https://localhost:8000';
// const httpClient = fetchUtils.fetchJson;

// const dataProvider= {
//     getList: (resource:any, params:any) => {
//         const { page, perPage } = params.pagination;
//         const { field, order } = params.sort;
//         const query = {
//             sort: JSON.stringify([field, order]),
//             range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
//             filter: JSON.stringify(params.filter),
//         };
//         const url = `${apiUrl}/${resource}?${stringify(query)}`;

//         return httpClient(url).then(({ headers, json }) => ({
//             data: json,
//             total: parseInt(headers.get('content-range')!.split('/').pop()!, 10),
 
           
//         }));
//     },

//     getOne: (resource:any) =>{
//     console.log("resource:",resource);

    
//         httpClient(`${apiUrl}/${resource}`).then(({ json }) => ({
//             data: json,
//         }))},

//     getMany: (resource:any, params:any) => {
//         const query = {
//             filter: JSON.stringify({ id: params.ids }),
//         };
//         const url = `${apiUrl}/${resource}?${stringify(query)}`;
//         return httpClient(url).then(({ json }) => ({ data: json }));
//     },

//     getManyReference: (resource:any, params:any) => {
//         const { page, perPage } = params.pagination;
//         const { field, order } = params.sort;
//         const query = {
//             sort: JSON.stringify([field, order]),
//             range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
//             filter: JSON.stringify({
//                 ...params.filter,
//                 [params.target]: params.id,
//             }),
//         };
//         const url = `${apiUrl}/${resource}?${stringify(query)}`;

//         return httpClient(url).then(({ headers, json }) => ({
//             data: json,
//             total: parseInt(headers.get('content-range')!.split('/').pop()!, 10),
//         }));
//     },

//     update: (resource:any, params:any) =>
//         httpClient(`${apiUrl}/${resource}/${params.id}`, {
//             method: 'PUT',
//             body: JSON.stringify(params.data),
//         }).then(({ json }) => ({ data: json })),

//     updateMany: (resource:any, params:any) => {
//         const query = {
//             filter: JSON.stringify({ id: params.ids}),
//         };
//         return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
//             method: 'PUT',
//             body: JSON.stringify(params.data),
//         }).then(({ json }) => ({ data: json }));
//     },

//     create: (resource:any, params:any) =>
//         httpClient(`${apiUrl}/${resource}`, {
//             method: 'POST',
//             body: JSON.stringify(params.data),
//         }).then(({ json }) => ({
//             data: { ...params.data, id: json.id },
//         })),

//     delete: (resource:any, params:any) =>
//         httpClient(`${apiUrl}/${resource}/${params.id}`, {
//             method: 'DELETE',
//         }).then(({ json }) => ({ data: json })),

//     deleteMany: (resource:any, params:any) => {
//         const query = {
//             filter: JSON.stringify({ id: params.ids}),
//         };
//         return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
//             method: 'DELETE',
//         }).then(({ json }) => ({ data: json }));
//     }
// };

// export default dataProvider;