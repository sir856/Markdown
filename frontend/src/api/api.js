import backend from '@/api/backend'
export default {
    async fetchDocumentsList () {
        return (await backend.get('documents')).data;
    },
    async fetchDocument (id) {
        return (await backend.get(`document/${id}`)).data;
    },
    async saveDocument (data) {
        return (await backend.post('document', data)).data;
    },
    async deleteDocument (id) {
        return (await backend.delete(`document/${id}`)).data;
    }
}
