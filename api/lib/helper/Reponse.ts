
type RepsonseOk = {
    data: {
      [name: string]: any
      meta: any
    }
  }

export function success(resource: any, meta: any = {}): RepsonseOk {
    const name = resource.constructor.name
  
    return { data: { [name.toLowerCase()]: resource.toJSON(), meta } }
  }
  