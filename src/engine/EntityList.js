export class EntityList {
	entities = [];

	add(EntityClass, time, ...args) {
		this.entities.push(new EntityClass(args, time, this));
	}

	remove(entity) {
		const index = this.entities.indexOf(entity);

		if (index < 0) return;
		this.entities.splice(index, 1);
	}

	update(time, context, camera) {
		for (const entity of this.entities) {
			entity.update(time, context, camera);
		}
	}

	draw(context, camera) {
		for (const entity of this.entities) {
			entity.draw(context, camera);
		}
	}
}
