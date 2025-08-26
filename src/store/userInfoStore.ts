import { create } from 'zustand'
interface IUserInfoStore {
  userInfo: {
    nickName: string
    avatarUrl: string
  }
  setUserInfo: (value: any) => void
  loadInfo: boolean
  setLoadInfo: (value: boolean) => void
}
export default create(
  (set): IUserInfoStore => ({
    userInfo: {
      nickName: '',
      avatarUrl: ''
    },
    loadInfo: false,
    setUserInfo: value => set(state => ({ userInfo: { ...state.userInfo, ...value } })),
    setLoadInfo: value => set(state => ({ loadInfo: value }))
  })
)
