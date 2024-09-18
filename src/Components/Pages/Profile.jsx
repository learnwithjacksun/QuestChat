import useAuth from "../../Hooks/useAuth"
import Layout from "../UI/Layout"

const Profile = () => {
    const {data} = useAuth()
  return (
      <>
          <Layout title="Profile">
              <div className="flex items-center md:gap-6 gap-4 md:flex-row flex-col text-center md:text-left">
                  <div className="relative bg-light h-32 w-32 rounded-full">
                      <div className="bg-light h-32 w-32 rounded-full overflow-hidden">
                          <img src={`https://api.dicebear.com/9.x/initials/svg?seed=${data?.name}`} alt="Avatar" />
                      </div>

                  </div>

                  <div>
                      <h1 className="font-sora text-[1em]">{data?.name}</h1>
                      <p className="text-sub text-sm">{data?.email}</p>
                  </div>
              </div>

              <div className="bg-light mt-6 rounded-md p-2">
                  <div className="flex justify-between items-center pb-2">
                      <h3 className="text-[1em] font-sora">Bio:</h3>

                      <button className="btn bg-lighter h-8 px-6 border border-line rounded">
                          <i className="fa-regular fa-pen-to-square fa-beat"></i>
                          <span>Edit</span>
                      </button>
                  </div>
                  <p className="text-display text-sub text-sm bg-secondary p-4">{data?.bio}</p>
              </div>
      </Layout>
      </>
  )
}

export default Profile