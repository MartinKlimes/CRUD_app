import { setActivePinia, createPinia } from "pinia";
import {useItemStore} from "../../stores/itemStore";
import { describe,it, beforeEach, expect } from "vitest";

describe("Pinia", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("should add item", async () => {
        const store = useItemStore();
        const item= {
            id: 1,
            title: "Sample Item Title",
            body: "Sample Item Body",
            important: false,
        };

        await store.createItem(item);
        expect(store.items).toContain(item);
    });
    it('should delete item', async () => {
        const store = useItemStore();
        const item= {
            id: 1,
            title: "Sample Item Title",
            body: "Sample Item Body",
            important: false,
        };
        await store.createItem(item);
        await store.deleteItem(item);
        expect(store.items).not.toContain(item);
    }
    );

}
);
