import './reFetch.scss'
export const RefetchButton = ({ reFetch }) => {
    return (
        <button className='reFetchBtn' onClick={() => reFetch()} >refetch</button>

    )
}
