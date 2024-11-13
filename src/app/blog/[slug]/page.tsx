interface  blogParam {
    params : {
        id: string
    }
}

const BlogId = ({params}:blogParam) => {
    return (
        <div>
            Blog id {params.id}
        </div>
    );
}

export default BlogId;