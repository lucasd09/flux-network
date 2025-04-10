import { BaseService } from "./base.service";
import { AppContext } from "../utils/types";

export class BaseController<
  TEntity,
  CreateDto extends {},
  UpdateDto extends Partial<CreateDto>,
  ReadDto,
> {
  constructor(
    protected readonly service: BaseService<
      TEntity,
      CreateDto,
      UpdateDto,
      ReadDto
    >,
  ) {}

  getAll = async (c: AppContext) => {
    try {
      const data = await this.service.findAll(c);

      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }

  getOne = async (c: AppContext) => {
    try {
      const id = c.req.param("id");

      const data = await this.service.findOne(c, +id);

      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }

  post = async (c: AppContext) => {
    try {
      const body = await c.req.json();

      if (body.lenght) {
        const data = await this.service.createMultiple(c, body);

        return c.json({ success: true, data });
      }

      const data = await this.service.create(c, body);

      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }

  patch = async (c: AppContext) => {
    try {
      const id = c.req.param("id");
      const body = await c.req.json();

      const data = await this.service.update(c, +id, body);

      return c.json({ success: true, data });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }
  
  remove = async (c: AppContext) => {
    try {
      const id = c.req.param("id");

      await this.service.remove(c, +id);
      return c.json({ success: true });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  }

  removeMultiple = async (c: AppContext) => {
    try {
      const ids = await c.req.json();
      await this.service.removeMultiple(c, ids);
      return c.json({ success: true });
    } catch (error: any) {
      return c.json(
        { success: false, message: error.message },
        error.status || 500,
      );
    }
  } 
}
