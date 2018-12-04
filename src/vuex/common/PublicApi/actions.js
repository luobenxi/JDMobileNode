import PublicApi from '../../../services/PublicApiService';

const api = new PublicApi();

const GetDictListByParent = (
    { commit },
    SubData
) => new Promise((resolve, reject) => {
    api.GetDictListByParent(SubData).then((res) => {
        resolve(res.data);
    }).catch((err) => {
        reject(err);
    });
});

export default {
    GetDictListByParent,
};
