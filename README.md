{
  name: 'Page',
  attributes: {
    myName:'',
    des:''
  }
  children: [
    {
      name: 'Banner',
      attributes: {}
      children: []
    },{
      name: 'List',
      attributes: {
        title:'学习区块'
      }
      children: [
        {
            name: 'Item',
            attribute:{
              link: '',
              picUrl: '',
              content: '',
              title: '',
            },
            children:[]
        }
      ]
    },{
      name: 'Footer',
      attributes: {}
      children: []
    }
  ]
}